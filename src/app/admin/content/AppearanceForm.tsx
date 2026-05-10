'use client';

import { useActionState, useState } from 'react';
import { updateAppearance } from './actions';
import styles from '../admin.module.css';

interface AppearanceFormProps {
  initialSettings: {
    backgroundType: 'color' | 'image';
    backgroundColor: string;
    backgroundImageUrl: string;
  };
}

export default function AppearanceForm({ initialSettings }: AppearanceFormProps) {
  const [state, formAction, isPending] = useActionState<{ error?: string; success?: string } | null, FormData>(updateAppearance, null);
  const [bgType, setBgType] = useState(initialSettings.backgroundType);
  const [imageSource, setImageSource] = useState<'url' | 'upload'>('url');

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Website Appearance</h2>
      </div>
      
      <form action={formAction} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="backgroundType">Background Type</label>
          <select 
            id="backgroundType" 
            name="backgroundType" 
            value={bgType}
            onChange={(e) => setBgType(e.target.value as 'color' | 'image')}
            className={styles.select}
          >
            <option value="color">Solid Color</option>
            <option value="image">Image</option>
          </select>
        </div>

        {bgType === 'color' && (
          <div className={styles.formGroup}>
            <label htmlFor="backgroundColor">Background Color</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="color" 
                id="backgroundColorPicker" 
                defaultValue={initialSettings.backgroundColor}
                onChange={(e) => {
                  const input = document.getElementById('backgroundColor') as HTMLInputElement;
                  if (input) input.value = e.target.value;
                }}
                style={{ width: '50px', height: '40px', padding: '0', cursor: 'pointer' }}
              />
              <input 
                type="text" 
                id="backgroundColor" 
                name="backgroundColor" 
                defaultValue={initialSettings.backgroundColor} 
                placeholder="#050505"
                style={{ flex: 1 }}
              />
            </div>
          </div>
        )}

        {bgType === 'image' && (
          <>
            <div className={styles.formGroup}>
              <label>Image Source</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="radio" 
                    name="imageSourceToggle" 
                    checked={imageSource === 'url'} 
                    onChange={() => setImageSource('url')} 
                  />
                  Image URL
                </label>
                <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="radio" 
                    name="imageSourceToggle" 
                    checked={imageSource === 'upload'} 
                    onChange={() => setImageSource('upload')} 
                  />
                  Upload File
                </label>
              </div>
            </div>

            {imageSource === 'url' ? (
              <div className={styles.formGroup}>
                <label htmlFor="imageUrl">Image URL</label>
                <input 
                  type="url" 
                  id="imageUrl" 
                  name="imageUrl" 
                  defaultValue={initialSettings.backgroundImageUrl} 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            ) : (
              <div className={styles.formGroup}>
                <label htmlFor="imageFile">Upload Image</label>
                <input 
                  type="file" 
                  id="imageFile" 
                  name="imageFile" 
                  accept="image/*"
                />
              </div>
            )}
            
            {/* Hidden field to keep URL when uploading is not selected but an old URL exists */}
            {imageSource === 'upload' && (
              <input type="hidden" name="imageUrl" value={initialSettings.backgroundImageUrl} />
            )}
          </>
        )}

        {state?.error && <p style={{ color: '#ff453a' }}>{state.error}</p>}
        {state?.success && <p style={{ color: '#32d74b' }}>{state.success}</p>}

        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Appearance'}
        </button>
      </form>
    </div>
  );
}
