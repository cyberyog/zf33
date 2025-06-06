// A simple script to download images from URLs and save them to style folders
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Function to download an image and save it to a specific folder
async function downloadImage(url, folderName, fileName) {
  try {
    console.log(`Downloading ${url} to ${folderName}/${fileName}...`);
    
    // Create the folder if it doesn't exist
    const folderPath = path.join(projectRoot, 'public', folderName);
    await fs.mkdir(folderPath, { recursive: true });
    const filePath = path.join(folderPath, fileName);
    
    // Create write stream for the output file
    const fileStream = fs.createWriteStream(filePath);
    
    // Determine if we should use http or https based on the URL
    const protocol = url.startsWith('https') ? https : http;
    
    // Use a more robust download method with appropriate headers
    return new Promise((resolve, reject) => {
      const request = protocol.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        timeout: 10000 // 10 seconds timeout
      }, (response) => {
        // Check if we got a redirect
        if (response.statusCode === 301 || response.statusCode === 302) {
          console.log(`Redirected to: ${response.headers.location}`);
          // Recursively follow the redirect
          downloadImage(response.headers.location, folderName, fileName)
            .then(resolve)
            .catch(reject);
          return;
        }
        
        // Check if we got a successful response
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: Status Code ${response.statusCode}`));
          return;
        }
        
        // Handle content type - make sure it's actually an image
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          console.warn(`Warning: Content-Type is not an image: ${contentType}`);
          console.warn(`URL might be protected: ${url}`);
          reject(new Error(`Unexpected content type: ${contentType}`));
          return;
        }
        
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Successfully saved image to ${filePath}`);
          resolve(filePath);
        });
        
        response.on('error', (err) => {
          fs.unlink(filePath).catch(() => {});  // Remove the file if there was an error
          reject(err);
        });
      });
      
      request.on('error', (err) => {
        fs.unlink(filePath).catch(() => {});  // Remove the file if there was an error
        reject(err);
      });
      
      request.on('timeout', () => {
        request.destroy();
        reject(new Error(`Request timed out for ${url}`));
      });
    });
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    throw error;
  }
}

// Check if a URL is accessible and is actually an image
async function isImageUrlValid(url) {
  try {
    const protocol = url.startsWith('https') ? https : http;
    
    return new Promise((resolve) => {
      const request = protocol.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        timeout: 5000
      }, (response) => {
        // Check for redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          resolve(false); // Don't follow redirects in the validation check
          return;
        }
        
        // Check for successful response
        if (response.statusCode !== 200) {
          resolve(false);
          return;
        }
        
        // Check content type
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          resolve(false);
          return;
        }
        
        resolve(true);
      });
      
      request.on('error', () => resolve(false));
      request.on('timeout', () => {
        request.destroy();
        resolve(false);
      });
    });
  } catch {
    return false;
  }
}

// Create folders for all style categories
async function createStyleFolders() {
  const styleCategories = [
    'style001', // cyber-zen
    'style002', // natural-flow
    'style003', // sacred-tech
    'style004', // urban-minimalism
    'style005', // digital-dreams
    'style006', // abstract-flow
    'style007', // neo-retro
    'style008', // iridescent-divinity
    'style011', // bronze-mythic-realism 
    'style021', // mythic-tech-realism
    'style022', // epic-painterly-realism
    'images',   // general images folder
    // Add more style categories as needed for future styles
  ];

  for (const folder of styleCategories) {
    const folderPath = path.join(projectRoot, 'public', folder);
    try {
      await fs.mkdir(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    } catch (error) {
      console.error(`Error creating folder ${folderPath}: ${error.message}`);
    }
  }
}

// Example usage
async function main() {
  // First create all style folders
  await createStyleFolders();
  
  // Example URLs for Mythic Tech Realism (style021) - using reliable sources like Pexels
  const imageUrls = [
    // Mythic Tech Realism Images (style021)
    {
      url: 'https://images.pexels.com/photos/7412111/pexels-photo-7412111.jpeg',
      folder: 'style021',
      fileName: '21photo01.png' // Keep .png extension as expected by the app
    },
    {
      url: 'https://images.pexels.com/photos/7412067/pexels-photo-7412067.jpeg',
      folder: 'style021',
      fileName: '21photo02.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg',
      folder: 'style021',
      fileName: '21photo03.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412089/pexels-photo-7412089.jpeg',
      folder: 'style021',
      fileName: '21photo04.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412072/pexels-photo-7412072.jpeg',
      folder: 'style021',
      fileName: '21photo05.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412082/pexels-photo-7412082.jpeg',
      folder: 'style021',
      fileName: '21photo06.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412103/pexels-photo-7412103.jpeg',
      folder: 'style021',
      fileName: '21photo07.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412104/pexels-photo-7412104.jpeg',
      folder: 'style021',
      fileName: '21photo08.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412091/pexels-photo-7412091.jpeg',
      folder: 'style021',
      fileName: '21photo09.png'
    },
    {
      url: 'https://images.pexels.com/photos/7412070/pexels-photo-7412070.jpeg',
      folder: 'style021',
      fileName: '21photo10.png'
    },
    
    // Epic Painterly Realism (style022)
    {
      url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
      folder: 'style022',
      fileName: '22photo01.png'
    },
    {
      url: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg',
      folder: 'style022',
      fileName: '22photo02.png'
    },
    {
      url: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg',
      folder: 'style022',
      fileName: '22photo03.png'
    },
    {
      url: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg',
      folder: 'style022',
      fileName: '22photo04.png'
    },
    {
      url: 'https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg',
      folder: 'style022',
      fileName: '22photo05.png'
    },
    {
      url: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      folder: 'style022',
      fileName: '22photo06.png'
    },
    {
      url: 'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg',
      folder: 'style022',
      fileName: '22photo07.png'
    },
    {
      url: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg',
      folder: 'style022',
      fileName: '22photo08.png'
    },
    {
      url: 'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg',
      folder: 'style022',
      fileName: '22photo09.png'
    },
    {
      url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
      folder: 'style022',
      fileName: '22photo10.png'
    },
    // Add more reliable image sources as needed
  ];
  
  // Download each image
  const results = [];
  for (const image of imageUrls) {
    try {
      // First check if the URL is valid and accessible
      const isValid = await isImageUrlValid(image.url);
      if (!isValid) {
        console.warn(`Skipping invalid or inaccessible URL: ${image.url}`);
        results.push({
          url: image.url,
          success: false,
          reason: 'Invalid or inaccessible URL'
        });
        continue;
      }
      
      // Download the image
      await downloadImage(image.url, image.folder, image.fileName);
      results.push({
        url: image.url,
        success: true
      });
    } catch (error) {
      console.error(`Failed to download ${image.url}: ${error.message}`);
      results.push({
        url: image.url,
        success: false,
        reason: error.message
      });
    }
  }
  
  // Print summary
  console.log('\nDownload Summary:');
  console.log('----------------');
  const successCount = results.filter(r => r.success).length;
  console.log(`Successfully downloaded: ${successCount}/${imageUrls.length} images`);
  
  if (successCount < imageUrls.length) {
    console.log('\nFailed downloads:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`- ${result.url}: ${result.reason}`);
    });
    
    console.log('\nTroubleshooting tips:');
    console.log('1. Some image hosts (like Midjourney) protect against direct downloads');
    console.log('2. Use public image repositories like Pexels, Unsplash, or your own hosted images');
    console.log('3. For protected sources, manually download the image and place it in the public folder');
    console.log('4. The script saves files with .png extension as required by the app, even if source is JPEG');
  }
  
  console.log('\nDone!');
}

main().catch(error => {
  console.error('Error in main process:', error);
  process.exit(1);
});