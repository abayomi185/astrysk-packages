/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * Ollama REST API
 * [Ollama](https://ollama.ai/) allows you to run powerful LLM models locally on your machine, and exposes a REST API to interact with them on localhost.

Based on the [official Ollama API docs](https://github.com/jmorganca/ollama/blob/main/docs/api.md)

### Getting started

1. Download [Ollama](https://ollama.ai/)
    
2. Pull a model, following [instructions](https://github.com/jmorganca/ollama)
    
3. Fire up localhost with `ollama serve`
 * OpenAPI spec version: 1.0.0
 */
import type { Generate200AnyOf } from "./generate200AnyOf";
import type { Generate200AnyOfTwo } from "./generate200AnyOfTwo";

// export type Generate200 = Generate200AnyOf | Generate200AnyOfTwo;
export type Generate200 = Generate200AnyOf;
