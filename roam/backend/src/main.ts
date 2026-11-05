import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { assertProductionConfig, loadConfig } from './config/env';
import { runMigrations } from './db/migrate';
import { buildOpenApi, configureApp } from './setup';

async function bootstrap() {
  const cfg = loadConfig();
  assertProductionConfig(cfg);
  if (process.env.MIGRATE_ON_START !== 'false') await runMigrations(cfg.databaseUrl);

  const app = configureApp(await NestFactory.create(AppModule, { bufferLogs: false }));
  SwaggerModule.setup('docs', app, buildOpenApi(app), { jsonDocumentUrl: 'docs/openapi.json' });
  await app.listen(cfg.port, '0.0.0.0');
  new Logger('Roam').log(`API on http://localhost:${cfg.port}/v1 — docs at /docs`);
}

void bootstrap();
