# Outfit Recommender

A modern web application that allows users to upload outfit images and receive stylized versions for different occasions.

## Features

- Drag and drop image upload
- Support for JPG and PNG formats
- Three stylized outputs per image (Office, Party, Vacation)
- Interactive loading screen with Tic Tac Toe game
- Responsive design
- Modern UI with smooth animations

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Dropzone

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Drag and drop an image or click to select one
2. Click "Generate Styles" to process the image
3. Play Tic Tac Toe while waiting for the results
4. View and download the stylized images

## Development

The project structure is organized as follows:

```
/src
  /components
    - UploadForm.tsx
    - OutputGallery.tsx
    - LoadingGame.tsx
  - App.tsx
  - index.tsx
  - index.css
```

## License

MIT 
