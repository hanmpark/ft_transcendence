from django.urls import re_path

from api.consumers import ChatConsumer, GameConsumer	

websocket_urlpatterns = [
	re_path(r'ws/chat/$', ChatConsumer.as_asgi()),
	re_path(r'ws/game/(?P<game_token>\w+)/$', GameConsumer.as_asgi()),
]