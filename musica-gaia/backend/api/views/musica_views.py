from rest_framework import viewsets, permissions
from ..models import Musica
from ..serializers import MusicaSerializer

class MusicaViewSet(viewsets.ModelViewSet):
    queryset = Musica.objects.all()
    serializer_class = MusicaSerializer
    permission_classes = [permissions.IsAuthenticated]
