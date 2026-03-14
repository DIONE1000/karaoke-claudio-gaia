import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the initial admin user'

    def handle(self, *args, **options):
        admin_email = os.getenv('ADMIN_EMAIL', 'admin@admin.com')
        admin_password = os.getenv('ADMIN_DEFAULT_PASSWORD', 'admin123')

        if not User.objects.filter(email=admin_email).exists():
            User.objects.create_superuser(
                email=admin_email,
                password=admin_password
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin user: {admin_email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin user already exists: {admin_email}'))
