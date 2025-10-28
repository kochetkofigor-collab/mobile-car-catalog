import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def create_landlord(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute('''
        INSERT INTO t_p20454517_mobile_car_catalog.landlords 
        (name, phone, whatsapp, telegram, is_verified)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    ''', (
        body_data.get('name'),
        body_data.get('phone'),
        body_data.get('whatsapp', ''),
        body_data.get('telegram', ''),
        body_data.get('isVerified', False)
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
        'body': json.dumps({'id': result['id'], 'message': 'Landlord created'})
    }

def update_landlord(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    landlord_id = body_data.get('id')
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute('''
        UPDATE t_p20454517_mobile_car_catalog.landlords
        SET name = %s, phone = %s, whatsapp = %s, telegram = %s, is_verified = %s
        WHERE id = %s
    ''', (
        body_data.get('name'),
        body_data.get('phone'),
        body_data.get('whatsapp', ''),
        body_data.get('telegram', ''),
        body_data.get('isVerified', False),
        landlord_id
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
        'body': json.dumps({'message': 'Landlord updated'})
    }

def delete_landlord(event: Dict[str, Any]) -> Dict[str, Any]:
    params = event.get('queryStringParameters', {})
    landlord_id = params.get('id')
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute('DELETE FROM t_p20454517_mobile_car_catalog.landlords WHERE id = %s', (landlord_id,))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'message': 'Landlord deleted'})
    }

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD operations for landlords
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with request_id
    Returns: HTTP response with landlords data
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
        return create_landlord(event)
    
    if method == 'PUT':
        return update_landlord(event)
    
    if method == 'DELETE':
        return delete_landlord(event)
    
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
        SELECT id, name, phone, whatsapp, telegram, is_verified
        FROM t_p20454517_mobile_car_catalog.landlords
        ORDER BY id
    ''')
    
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    landlords = []
    for row in rows:
        landlords.append({
            'id': row['id'],
            'name': row['name'],
            'phone': row['phone'],
            'whatsapp': row['whatsapp'],
            'telegram': row['telegram'],
            'isVerified': row['is_verified']
        })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(landlords)
    }
