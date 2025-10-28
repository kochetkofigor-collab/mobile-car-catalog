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
            id, name, brand, year, price_per_day, deposit, 
            buyout_months, images, city, is_new, is_promo
        FROM t_p20454517_mobile_car_catalog.cars
        ORDER BY id
    ''')
    
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    cars = []
    for row in rows:
        cars.append({
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
        })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(cars)
    }
