
import React from 'react';

export enum ToolCategory {
  OFFICE = 'Ofis & Finans',
  TEXT = 'Metin Araçları',
  DEV = 'Yazılımcı Araçları',
  UNIT = 'Dönüştürücüler',
  DESIGN = 'Tasarım Araçları',
  MISC = 'Diğer'
}

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ToolCategory;
  path: string;
  color: string;
  keywords: string[];
}
