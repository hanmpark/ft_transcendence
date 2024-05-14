from django.db import models
from django.contrib.auth.models import AbstractUser

class Match(models.Model):
    matchID = models.CharField(max_length = 48)
    playerA = models.JSONField # ex: {"id": "user_202020202020", "platform": "terminal"}
    playerB = models.JSONField 
    scores = models.JSONField # ex: {"user_202020202020": 5, "user_202020202021", 3}
    startedAt = models.DateTimeField
    finishedAt = models.DateTimeField
    flags = models.IntegerField # is AI game = 0x1

    def __str__(self):
        return self.matchID

class User(AbstractUser):
    userID = models.CharField(max_length = 48, unique=True)
    username = models.CharField(max_length = 16)
    displayName = models.CharField(max_length = 16, null = True)
    email = models.CharField(max_length = 64)
    mfaToken = models.CharField(max_length = 32, null = True)
    lang = models.CharField(max_length = 6)
    avatarID = models.CharField(max_length = 68, null = True)
    oauthUid = models.CharField(max_length = 64, null = True)
    # passwords should be limited to 72 **bytes** because of a bcrypt limitation
    password = models.CharField(max_length = 128)
    flags = models.IntegerField(default = 0) # 1 << 0 = AI account

        # Override the groups and user_permissions to avoid field clashes
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="user_set_custom",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="user_set_custom",
        related_query_name="user",
    )

    def __str__(self):
        return self.userID

class Message(models.Model):
    messageID = models.CharField(max_length = 48)
    content = models.CharField(max_length = 256)
    authorID = models.CharField(max_length = 48)

    def __str__(self):
        return self.messageID

class Relationship(models.Model):
    relationshipID = models.CharField(max_length = 48)
    userA = models.CharField(max_length = 48)
    userB = models.CharField(max_length = 48)
    status = models.IntegerField # 0 = pending, 1 = accepted, 2 = blocked

    def __str__(self):
        return self.relationshipID
    
class Token(models.Model):
    tokenID = models.CharField(max_length = 48)
    token = models.CharField(max_length = 256)
    revoked = models.BooleanField(default = False)

    def __str__(self):
        return self.token