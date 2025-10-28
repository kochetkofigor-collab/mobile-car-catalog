import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def create_car(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    landlord_data = body_data.get('landlord')
    landlord_id = landlord_data.get('id') if landlord_data else None
    
    cur.execute('''
        INSERT INTO t_p20454517_mobile_car_catalog.cars 
        (name, brand, year, price_per_day, deposit, buyout_months, images, city, is_new, is_promo, is_highlighted, coming_soon_date, landlord_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    ''', (
        body_data.get('name'),
        body_data.get('brand'),
        body_data.get('year'),
        body_data.get('pricePerDay'),
        body_data.get('deposit', 0),
        body_data.get('buyoutMonths', 0),
        body_data.get('images', []),
        body_data.get('city', ''),
        body_data.get('isNew', False),
        body_data.get('isPromo', False),
        body_data.get('isHighlighted', False),
        body_data.get('comingSoonDate'),
        landlord_id
    ))
    
    result = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'id': result['id'], 'message': 'Car created'})
    }

def update_car(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    car_id = body_data.get('id')
    database_url = os.environ.get('DATABASE_URL')
    
    landlord_data = body_data.get('landlord')
    landlord_id = landlord_data.get('id') if landlord_data else None
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute('''
        UPDATE t_p20454517_mobile_car_catalog.cars
        SET name = %s, brand = %s, year = %s, price_per_day = %s,
            deposit = %s, buyout_months = %s, images = %s, city = %s,
            is_new = %s, is_promo = %s, is_highlighted = %s, coming_soon_date = %s, landlord_id = %s
        WHERE id = %s
    ''', (
        body_data.get('name'),
        body_data.get('brand'),
        body_data.get('year'),
        body_data.get('pricePerDay'),
        body_data.get('deposit', 0),
        body_data.get('buyoutMonths', 0),
        body_data.get('images', []),
        body_data.get('city', ''),
        body_data.get('isNew', False),
        body_data.get('isPromo', False),
        body_data.get('isHighlighted', False),
        body_data.get('comingSoonDate'),
        landlord_id,
        car_id
    ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'message': 'Car updated'})
    }

def delete_car(event: Dict[str, Any]) -> Dict[str, Any]:
    params = event.get('queryStringParameters', {})
    car_id = params.get('id')
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute('DELETE FROM t_p20454517_mobile_car_catalog.cars WHERE id = %s', (car_id,))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'message': 'Car deleted'})
    }

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD operations for cars
    Args: event - dict with httpMethod, body, pathParams
          context - object with request_id
    Returns: HTTP response with cars data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        return create_car(event)
    
    if method == 'PUT':
        return update_car(event)
    
    if method == 'DELETE':
        return delete_car(event)
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute('''
        SELECT 
            c.id, c.name, c.brand, c.year, c.price_per_day, c.deposit, 
            c.buyout_months, c.images, c.city, c.is_new, c.is_promo, c.is_highlighted, c.coming_soon_date,
            l.id as landlord_id, l.name as landlord_name, l.phone as landlord_phone,
            l.whatsapp as landlord_whatsapp, l.telegram as landlord_telegram,
            l.is_verified as landlord_verified
        FROM t_p20454517_mobile_car_catalog.cars c
        LEFT JOIN t_p20454517_mobile_car_catalog.landlords l ON c.landlord_id = l.id
        ORDER BY c.id
    ''')
    
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    cars = []
    for row in rows:
        car_data = {
            'id': row['id'],
            'name': row['name'],
            'brand': row['brand'],
            'year': row['year'],
            'pricePerDay': row['price_per_day'],
            'deposit': row['deposit'],
            'buyoutMonths': row['buyout_months'],
            'images': row['images'],
            'city': row['city'],
            'isNew': row['is_new'],
            'isPromo': row['is_promo'],
            'isHighlighted': row['is_highlighted'],
            'comingSoonDate': row['coming_soon_date'].isoformat() if row['coming_soon_date'] else None
        }
        
        if row['landlord_id']:
            car_data['landlord'] = {
                'id': row['landlord_id'],
                'name': row['landlord_name'],
                'phone': row['landlord_phone'],
                'whatsapp': row['landlord_whatsapp'],
                'telegram': row['landlord_telegram'],
                'isVerified': row['landlord_verified']
            }
        
        cars.append(car_data)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(cars)
    }