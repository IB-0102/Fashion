import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Collection } from './types';
import { supabase } from './supabase';

interface StoreState {
  products: Product[];
  collections: Collection[];
  addProduct: (product: Product) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, collection: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  fetchInitialData: () => Promise<void>;
}

const defaultCollections: Collection[] = [
  {
    id: 'c1',
    name: 'Luxury Shoes',
    description: 'Premium handcrafted footwear designed for comfort, confidence and elegance.',
    image: 'https://i.ibb.co/d45rTpbW/nina1399-ai-generated-9355313-1920.jpg',
    price: 200000,
    order: 1
  },
  {
    id: 'c2',
    name: 'Luxury Bags',
    description: 'Elegant handbags made to complement every outfit with sophisticated flair.',
    image: 'https://i.ibb.co/7d81YtYJ/jumpinjake-handbag-883113.jpg',
    price: 400000,
    order: 2
  },
  {
    id: 'c3',
    name: 'Luxury Clothing',
    description: 'Beautiful outfits tailored for modern women who appreciate the finest fabrics.',
    image: 'https://i.ibb.co/mC0qn3C5/pexels-musaabzayona-19230344.jpg',
    price: 700000,
    order: 3
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: [],
      collections: defaultCollections,
      addProduct: async (product) => {
        if (supabase) {
          const { error } = await supabase.from('kayhab_products').insert([product]);
          if (error) {
            console.error("Error adding product to supabase:", error);
            alert("Failed to save product to database: " + error.message + "\n(You may need to upload smaller images)");
            return false;
          }
        }
        set((state) => ({ products: [...state.products, product] }));
        return true;
      },
      updateProduct: async (id, updatedFields) => {
        if (supabase) {
          const { error } = await supabase.from('kayhab_products').update(updatedFields).eq('id', id);
          if (error) {
            console.error("Error updating product in supabase:", error);
            alert("Failed to update product: " + error.message);
            return false;
          }
        }
        set((state) => ({
          products: state.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
        }));
        return true;
      },
      deleteProduct: async (id) => {
        if (supabase) {
          const { error } = await supabase.from('kayhab_products').delete().eq('id', id);
          if (error) {
            console.error("Error deleting product from supabase:", error);
            alert("Failed to delete product: " + error.message);
            return false;
          }
        }
        set((state) => ({
          products: state.products.filter(p => p.id !== id)
        }));
        return true;
      },
      addCollection: async (collection) => {
        set((state) => ({ collections: [...state.collections, collection] }));
        if (supabase) await supabase.from('kayhab_collections').insert([collection]);
      },
      updateCollection: async (id, updatedFields) => {
        set((state) => ({
          collections: state.collections.map(c => c.id === id ? { ...c, ...updatedFields } : c)
        }));
        if (supabase) await supabase.from('kayhab_collections').update(updatedFields).eq('id', id);
      },
      deleteCollection: async (id) => {
        set((state) => ({
          collections: state.collections.filter(c => c.id !== id)
        }));
        if (supabase) await supabase.from('kayhab_collections').delete().eq('id', id);
      },
      isAdminAuthenticated: false,
      loginAdmin: () => set({ isAdminAuthenticated: true }),
      logoutAdmin: () => set({ isAdminAuthenticated: false }),
      fetchInitialData: async () => {
        if (!supabase) return;
        try {
          const [productsRes, collectionsRes] = await Promise.all([
            supabase.from('kayhab_products').select('*'),
            supabase.from('kayhab_collections').select('*').order('order')
          ]);
          
          if (productsRes.data) {
            set({ products: productsRes.data as Product[] });
          }
          if (collectionsRes.data && collectionsRes.data.length > 0) {
            set({ collections: collectionsRes.data as Collection[] });
          } else if (collectionsRes.data && collectionsRes.data.length === 0) {
            // Seed initial collections
            const { data, error: insertError } = await supabase.from('kayhab_collections').insert(defaultCollections).select('*');
            if (insertError) {
              console.error("Error seeding collections:", insertError);
            }
            if (data && data.length > 0) {
              set({ collections: data as Collection[] });
            }
          }
        } catch (error) {
          console.error("Error fetching data from Supabase:", error);
        }
      }
    }),
    {
      name: 'kayhab-storage',
      version: 1,
    }
  )
);
