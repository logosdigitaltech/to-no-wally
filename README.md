# Cartão Wally

Sistema web para criar gratuitamente uma arte de divulgação profissional do Wally em formatos Stories e Feed.

## Tecnologias

- Next.js App Router
- TypeScript estrito
- Tailwind CSS
- React Hook Form e Zod
- Lucide Icons
- html-to-image
- qrcode
- Vitest e Testing Library

## Como instalar

```bash
pnpm install
```

## Como executar localmente

```bash
pnpm dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

- `NEXT_PUBLIC_WALLY_DOWNLOAD_URL`: URL oficial para baixar o Wally ou página de links.
- `NEXT_PUBLIC_SITE_URL`: URL pública do projeto após deploy.
- `NEXT_PUBLIC_MAX_PHOTO_MB`: limite de upload da foto em MB.

Não há credenciais reais no repositório. O MVP não usa Supabase, backend do Wally, Neon, Prisma ou Vercel Blob.

## Identidade visual

O favicon e o ícone para dispositivos Apple são derivados da imagem oficial fornecida. O wordmark usa Grandstander, carregada localmente pelo pacote `@fontsource/grandstander`, inclusive durante a exportação das artes.

## Testes e qualidade

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

## Deploy na Vercel

1. Crie um repositório no GitHub e envie este projeto.
2. Importe o repositório na Vercel.
3. Configure as variáveis de ambiente listadas acima.
4. Use o preset de Next.js.
5. Publique.

## Trocar a URL de download do Wally

Altere `NEXT_PUBLIC_WALLY_DOWNLOAD_URL` no ambiente local ou nas variáveis da Vercel. Essa URL alimenta o QR Code, CTA, texto de WhatsApp e links do rodapé.

## Privacidade e armazenamento

Nesta versão, o preenchimento funciona sem login. Os dados e a foto são usados no navegador para gerar a arte e não são enviados para um backend próprio. O app não acessa banco de dados, autenticação ou Supabase do aplicativo Wally.

O formulário alerta antes de perder um cartão ainda não baixado. Não há uso de `localStorage` para manter foto indefinidamente.

## Limitações conhecidas

- Compartilhar imagem como arquivo depende da Web Share API e do suporte do navegador.
- Instagram, Facebook e WhatsApp podem exigir anexo manual da imagem.
- A criação automática de um repositório GitHub exige autenticação local do `gh` ou criação manual no GitHub.
- O QR Code e os links de chamada para ação usam `https://www.appwally.com/links/` por padrão.
