from rest_framework import viewsets
from .models import Musica
from .serializers import MusicaSerializer

class MusicaViewSet(viewsets.ModelViewSet):
    queryset = Musica.objects.all()
    serializer_class = MusicaSerializer
