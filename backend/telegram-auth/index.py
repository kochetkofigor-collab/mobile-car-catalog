"""
Business: Telegram bot webhook для авторизации пользователей
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с request_id, function_name, memory_limit_in_mb
Returns: HTTP response dict
"""

import json
import os
import secrets
from typing import Dict, Any
from datetime import datetime, timedelta
import urllib.request
import urllib.parse

auth_tokens: Dict[str, Dict[str, Any]] = {}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            
            if 'message' in body_data:
                update = body_data
                bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
                
                if not bot_token:
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'ok': True}),
                        'isBase64Encoded': False
                    }
                
                message = update.get('message', {})
                text = message.get('text', '')
                user = message.get('from', {})
                chat_id = message.get('chat', {}).get('id')
                
                if text.startswith('/start'):
                    parts = text.split(' ')
                    if len(parts) > 1:
                        token = parts[1]
                        
                        auth_tokens[token] = {
                            'user': {
                                'id': user.get('id'),
                                'first_name': user.get('first_name'),
                                'last_name': user.get('last_name'),
                                'username': user.get('username'),
                                'photo_url': None
                            },
                            'created_at': datetime.now().isoformat(),
                            'expires_at': (datetime.now() + timedelta(minutes=5)).isoformat()
                        }
                        
                        response_text = f"✅ Вы успешно авторизованы!\n\nВернитесь на сайт KeyRider - авторизация произойдет автоматически."
                    else:
                        response_text = "👋 Привет! Нажмите кнопку 'Войти через Telegram' на сайте KeyRider для авторизации."
                    
                    send_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                    params = {
                        'chat_id': chat_id,
                        'text': response_text
                    }
                    
                    data = urllib.parse.urlencode(params).encode('utf-8')
                    req = urllib.request.Request(send_url, data=data)
                    urllib.request.urlopen(req)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'ok': True}),
                    'isBase64Encoded': False
                }
                
        except Exception as e:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True, 'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'GET':
        token = event.get('queryStringParameters', {}).get('token')
        
        if not token:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Token required'}),
                'isBase64Encoded': False
            }
        
        if token in auth_tokens:
            token_data = auth_tokens[token]
            expires_at = datetime.fromisoformat(token_data['expires_at'])
            
            if datetime.now() > expires_at:
                del auth_tokens[token]
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Token expired'}),
                    'isBase64Encoded': False
                }
            
            user_data = token_data['user']
            del auth_tokens[token]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'user': user_data}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Token not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
