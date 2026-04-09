// 이미지 리사이징 유틸리티

export interface ResizedImage {
  id: string;
  url: string;          // 리사이즈된 이미지 (최대 1200px)
  thumbnail: string;    // 썸네일 (200px)
  name: string;
}

/**
 * 이미지 파일을 리사이징하여 Base64로 반환
 * @param file - 원본 이미지 파일
 * @param maxWidth - 최대 너비
 * @param quality - JPEG 품질 (0~1)
 */
export async function resizeImage(
  file: File,
  maxWidth: number,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // 비율 유지하며 리사이징
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // 고품질 리샘플링 설정
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // WebP 지원 여부 확인 후 포맷 결정
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(format, quality);
        
        resolve(dataUrl);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * 썸네일 생성 (정사각형 200x200px 크롭)
 * @param file - 원본 이미지 파일
 * @param size - 정사각형 크기 (기본 200px)
 * @param quality - JPEG 품질 (0~1)
 */
export async function generateThumbnail(
  file: File,
  size: number = 200,
  quality: number = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // 정사각형 크롭을 위한 계산
        const sourceSize = Math.min(img.width, img.height);
        const sourceX = (img.width - sourceSize) / 2;
        const sourceY = (img.height - sourceSize) / 2;
        
        // 고품질 리샘플링 설정
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // 중앙 크롭하여 정사각형으로 그리기
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceSize, sourceSize,  // 소스 영역 (정사각형)
          0, 0, size, size                            // 대상 영역 (200x200)
        );
        
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(format, quality);
        
        resolve(dataUrl);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * 이미지 파일을 리사이즈 + 썸네일 생성
 */
export async function processImage(file: File): Promise<{
  url: string;
  thumbnail: string;
}> {
  try {
    const [url, thumbnail] = await Promise.all([
      resizeImage(file, 1200, 0.85),      // 본 이미지: 최대 1200px, 품질 85%
      generateThumbnail(file, 200, 0.75), // 썸네일: 200x200px 정사각형, 품질 75%
    ]);
    
    return { url, thumbnail };
  } catch (error) {
    console.error('Image processing failed:', error);
    throw error;
  }
}

/**
 * 이미지 배열을 처리하여 ResizedImage[] 반환
 */
export async function processImages(files: File[]): Promise<ResizedImage[]> {
  const results: ResizedImage[] = [];
  
  for (const file of files) {
    try {
      const { url, thumbnail } = await processImage(file);
      results.push({
        id: `${Date.now()}-${Math.random()}`,
        url,
        thumbnail,
        name: file.name,
      });
    } catch (error) {
      console.error(`Failed to process ${file.name}:`, error);
      // 실패한 파일은 건너뛰기
    }
  }
  
  return results;
}