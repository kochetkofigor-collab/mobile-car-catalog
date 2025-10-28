import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all cars from database
    Args: event - dict with httpMethod
          context - object with request_id
    Returns: HTTP response with cars list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
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
            c.buyout_months, c.images, c.city, c.is_new, c.is_promo,
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
            'isPromo': row['is_promo']
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