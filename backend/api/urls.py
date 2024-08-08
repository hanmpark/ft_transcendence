from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views.auth import *
from .views.users import *
from .views.tournaments import *
from .views.internal import *
from .views.oauth import *

urlpatterns = [
    path('auth/register', AuthRegister.as_view()),
    path('auth/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/@me/profile', UserProfileMe.as_view()), # GET, PATCH
    path('users/<userID>/profile', UserProfile.as_view()), # GET
    path('users/@me/matches', UserMatchesMe.as_view()), # GET
    path('users/<userID>/matches', UserMatches.as_view()), # GET
    path('users/@me/settings', UserSettingsMe.as_view()), # GET, PATCH
    path('users/@me/relationships', UserRelationshipsMe.as_view()), # GET, PUT
    path('users/@me/harvest', UserHarvestMe.as_view()), # POST, GET, DELETE
    path('users/@me/delete', UserDeleteMe.as_view()), # POST, GET, DELETE

    path('auth/42/login', OAuth42Login.as_view(), name='oauth42_login'),
    path('auth/42/callback', OAuth42Callback.as_view(), name='oauth42_callback'),

    # path('tournaments/<tournamentID>', TournamentInfo.as_view()), # GET, DELETE, PATCH
    # path('tournaments', TournamentCreate.as_view()), # POST

    path('__internal/check_user_exists/<userID>', CheckUserExists.as_view()), # GET
    path('__internal/create_match', CreateMatchHistory.as_view()), # POST
]