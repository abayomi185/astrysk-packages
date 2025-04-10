/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type CreateNodesSingleCertificatesCustomResponseResponseData = {
  filename?: string;
  /** Certificate SHA 256 fingerprint. */
  fingerprint?: string;
  /** Certificate issuer name. */
  issuer?: string;
  /** Certificate's notAfter timestamp (UNIX epoch). */
  notafter?: number;
  /** Certificate's notBefore timestamp (UNIX epoch). */
  notbefore?: number;
  /** Certificate in PEM format */
  pem?: string;
  /** Certificate's public key size */
  "public-key-bits"?: number;
  /** Certificate's public key algorithm */
  "public-key-type"?: string;
  /** List of Certificate's SubjectAlternativeName entries. */
  san?: string[];
  /** Certificate subject name. */
  subject?: string;
};
