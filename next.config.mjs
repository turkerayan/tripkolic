/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'picsum.photos',
          'images.unsplash.com', // Unsplash kullanıyorsanız
          'example.com', // Diğer kullandığınız domain'ler
          'res.cloudinary.com' // Cloudinary için
        ],
      },
};

export default nextConfig;
