import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import type { GiftFormData, PhotoWithNote } from '../../../types/gift';
import { processImage } from '../../../utils/imageProcessing';

interface Step2ImagesProps {
  formData: GiftFormData;
  updateFormData: (updates: Partial<GiftFormData>) => void;
  onNext: () => void;
}

export default function Step2Images({ formData, updateFormData }: Step2ImagesProps) {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const processed = await processImage(file, 1200, 800);
      updateFormData({ bannerImage: processed });
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos: PhotoWithNote[] = [];

    for (const file of files) {
      const processed = await processImage(file, 800, 800);
      newPhotos.push({
        file: processed,
        note: '',
        preview: URL.createObjectURL(file),
      });
    }

    updateFormData({ photos: [...formData.photos, ...newPhotos] });
  };

  const updatePhotoNote = (index: number, note: string) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index].note = note;
    updateFormData({ photos: updatedPhotos });
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: updatedPhotos });
  };

  return (
    <div className="space-y-8">
      {/* Banner Image */}
      <div className="space-y-4">
        <Label>Banner Image *</Label>
        <div className="border-2 border-dashed border-romantic-primary/30 rounded-lg p-6 text-center hover:border-romantic-primary/50 transition-colors">
          {bannerPreview ? (
            <div className="space-y-4">
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="max-h-64 mx-auto rounded-lg object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => bannerInputRef.current?.click()}
                className="border-romantic-primary/30"
              >
                Change Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground" />
              <Button
                variant="outline"
                onClick={() => bannerInputRef.current?.click()}
                className="border-romantic-primary/30"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Banner
              </Button>
              <p className="text-sm text-muted-foreground">Recommended: 1200x800px or similar ratio</p>
            </div>
          )}
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="space-y-4">
        <Label>Photo Gallery (Optional)</Label>
        <Button
          variant="outline"
          onClick={() => photosInputRef.current?.click()}
          className="w-full border-romantic-primary/30 hover:bg-romantic-primary/10"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Photos
        </Button>
        <input
          ref={photosInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotosUpload}
          className="hidden"
        />

        {formData.photos.length > 0 && (
          <div className="space-y-4 mt-6">
            {formData.photos.map((photo, index) => (
              <div
                key={index}
                className="border border-romantic-primary/20 rounded-lg p-4 space-y-3 bg-card/50"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={photo.preview}
                    alt={`Photo ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`note-${index}`}>Personal Note for This Photo</Label>
                    <Textarea
                      id={`note-${index}`}
                      value={photo.note}
                      onChange={(e) => updatePhotoNote(index, e.target.value)}
                      placeholder="Write a special note about this memory..."
                      className="min-h-[80px] border-romantic-primary/30"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePhoto(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
