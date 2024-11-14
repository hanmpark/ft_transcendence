# Generated by Django 5.0.6 on 2024-10-28 13:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_user_xp'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='whitelist',
            field=models.ManyToManyField(limit_choices_to=2, related_name='whitelisted_matches', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='message',
            name='messageType',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tournamentID', models.CharField(max_length=48, unique=True)),
                ('name', models.CharField(max_length=16)),
                ('startDate', models.DateTimeField(default=None, null=True)),
                ('endDate', models.DateTimeField(default=None, null=True)),
                ('maxParticipants', models.IntegerField(default=8)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('ONGOING', 'Ongoing'), ('COMPLETED', 'Completed'), ('CANCELLED', 'Cancelled')], default='PENDING', max_length=20)),
                ('winnerID', models.CharField(default=None, max_length=48, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('isPublic', models.BooleanField(default=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_tournaments', to=settings.AUTH_USER_MODEL)),
                ('participants', models.ManyToManyField(related_name='tournaments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='match',
            name='tournament',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='matches', to='api.tournament'),
        ),
        migrations.CreateModel(
            name='TournamentInvite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inviteID', models.CharField(max_length=48, unique=True)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('ACCEPTED', 'Accepted'), ('DECLINED', 'Declined')], default='PENDING', max_length=20)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('invitee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_invites', to=settings.AUTH_USER_MODEL)),
                ('inviter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_invites', to=settings.AUTH_USER_MODEL)),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invites', to='api.tournament')),
            ],
        ),
    ]