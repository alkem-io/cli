import fs from 'fs';
import path from 'path';
import axios from 'axios';
import winston from 'winston';

export async function isImageAccessible(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export function beautifyCamelCase(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
}

// copy from server\src\domain\common\profile\profile.service.ts
export const generateRandomAvatar = (
  firstName: string,
  lastName: string
): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&background=${randomColor}&color=ffffff&size=145`;
};

export async function downloadAvatar(
  url: string,
  name = 'avatar',
  logger: winston.Logger
) {
  let filePath = '';

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'image/svg+xml, image/png',
      },
    });
    const contentType = response.headers['content-type'];

    if (contentType.includes('image/svg+xml')) {
      filePath = path.join(__dirname, 'avatars', `${name}.svg`);
      fs.writeFileSync(filePath, response.data);
    } else if (contentType.includes('image/png')) {
      filePath = path.join(__dirname, 'avatars', `${name}.svg`);
      fs.writeFileSync(filePath, response.data);
    }
    logger.info(`Downloaded avatar to: ${filePath}`);

    return filePath;
  } catch (error) {
    return filePath;
  }
}
