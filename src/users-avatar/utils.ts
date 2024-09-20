import fs from 'fs';
import path from 'path';
import axios from 'axios';
import winston from 'winston';

export async function isImageAccessible(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);

    // check in case we're getting an SVG and we expect PNG
    // const contentType = response.headers['content-type'];
    // if (
    //   (contentType.includes('image/png') &&
    //     response.data?.startsWith('<svg')) ||
    //   response.data?.startsWith('<?xml')
    // ) {
    //   console.log(`Content-Type: ${contentType};`);
    //   console.log(`URL: ${url};`);
    //   console.log(`Data: ${response.data};`);

    //   return false;
    // }

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

  // set initials, color & background, specify the format and set size so it's not blurry on the profile
  return `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&background=${randomColor}&color=ffffff&size=300&format=png`;
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

    const avatarsDir = path.join(__dirname, 'avatars');
    if (!fs.existsSync(avatarsDir)) {
      fs.mkdirSync(avatarsDir, { recursive: true });
    }

    if (contentType.includes('image/svg+xml')) {
      filePath = path.join(avatarsDir, `${name}.svg`);
      fs.writeFileSync(filePath, response.data);
    } else if (contentType.includes('image/png')) {
      filePath = path.join(avatarsDir, `${name}.svg`);
      fs.writeFileSync(filePath, response.data);
    }
    logger.info(`Downloaded avatar to: ${filePath}`);

    return filePath;
  } catch (error) {
    return filePath;
  }
}
