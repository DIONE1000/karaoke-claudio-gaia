from django.db import models

class Musica(models.Model):
    musica = models.CharField(max_length=255)
    cantor = models.CharField(max_length=255)
    local = models.CharField(max_length=100)
    versao = models.CharField(max_length=255, blank=True, null=True)
    link = models.URLField(max_length=500, blank=True, null=True)
    linkTipo = models.CharField(max_length=50, default='cantor')
    linkAtivo = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-criado_em']

    def __str__(self):
        return f"{self.musica} - {self.cantor}"
