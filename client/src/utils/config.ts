interface EnvVariables {
  VITE_CLOUDINARY_UPLOAD_PRESET: string;
  VITE_CLOUDINARY_UPLOAD_URL: string;
}

const {
  VITE_CLOUDINARY_UPLOAD_PRESET: CLOUDINARY_UPLOAD_PRESET,
  VITE_CLOUDINARY_UPLOAD_URL: CLOUDINARY_UPLOAD_URL,
} = import.meta.env as unknown as EnvVariables;

function enforceEnvVariable(name: string): void {
  if (!import.meta.env[name]) {
    throw new Error(`Missing environment variable ${name}`);
  }
}

enforceEnvVariable('VITE_CLOUDINARY_UPLOAD_PRESET');
enforceEnvVariable('VITE_CLOUDINARY_UPLOAD_URL');

export { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL };
