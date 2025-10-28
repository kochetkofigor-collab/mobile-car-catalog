'''
Business: Manage listing requests from users who want to add their cars
Args: event with httpMethod (GET/POST/DELETE), body with name and phone
Returns: HTTP response with listing requests data
'''

import json
import os
from typing import Dict, Any, List
from datetime import datetime

# Simple in-memory storage (in production use database)
STORAGE_FILE = '/tmp/listing_requests.json'

def load_requests() -> List[Dict[str, Any]]:
    if os.path.exists(STORAGE_FILE):
        with open(STORAGE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_requests(requests: List[Dict[str, Any]]) -> None:
    with open(STORAGE_FILE, 'w', encoding='utf-8') as f:
        json.dump(requests, f, ensure_ascii=False, indent=2)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    # GET - return all requests
    if method == 'GET':
        requests = load_requests()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(requests, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    # POST - create new request
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        requests = load_requests()
        new_id = max([r.get('id', 0) for r in requests], default=0) + 1
        
        new_request = {
            'id': new_id,
            'name': body_data.get('name', ''),
            'phone': body_data.get('phone', ''),
            'createdAt': datetime.now().isoformat(),
            'status': 'new'
        }
        
        requests.append(new_request)
        save_requests(requests)
        
        return {
            'statusCode': 201,
            'headers': headers,
            'body': json.dumps(new_request, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    # DELETE - remove request by id
    if method == 'DELETE':
        params = event.get('queryStringParameters', {}) or {}
        request_id = int(params.get('id', 0))
        
        requests = load_requests()
        requests = [r for r in requests if r.get('id') != request_id]
        save_requests(requests)
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
