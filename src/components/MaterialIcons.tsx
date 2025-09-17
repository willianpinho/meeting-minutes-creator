// React Web implementation of Material Icons
import React from 'react';
import {
  Add,
  Description,
  Visibility,
  ArrowBack,
  Edit,
  Delete,
  Save,
  Cancel,
  Download,
  Share,
  Search,
  Menu,
  MoreVert,
  Check,
  Close,
} from '@mui/icons-material';

import type {
  MaterialIconProps,
  MaterialIconComponent,
  MaterialIconName,
} from '@meeting-minutes/shared/components/MaterialIcons';

// Icon mapping for web
const iconMap = {
  add: Add,
  description: Description,
  visibility: Visibility,
  arrow_back: ArrowBack,
  edit: Edit,
  delete: Delete,
  save: Save,
  cancel: Cancel,
  download: Download,
  share: Share,
  search: Search,
  menu: Menu,
  more_vert: MoreVert,
  check: Check,
  close: Close,
};

// Web-specific Material Icon implementation
export const MaterialIcon: React.FC<MaterialIconProps & { name: MaterialIconName }> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return (
    <IconComponent
      style={{
        fontSize: size,
        color,
        ...style,
      }}
    />
  );
};

// Individual icon components
export const AddIcon: MaterialIconComponent = (props) =>
  <Add style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const DescriptionIcon: MaterialIconComponent = (props) =>
  <Description style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const VisibilityIcon: MaterialIconComponent = (props) =>
  <Visibility style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const ArrowBackIcon: MaterialIconComponent = (props) =>
  <ArrowBack style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const EditIcon: MaterialIconComponent = (props) =>
  <Edit style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const DeleteIcon: MaterialIconComponent = (props) =>
  <Delete style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const SaveIcon: MaterialIconComponent = (props) =>
  <Save style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;

export const CancelIcon: MaterialIconComponent = (props) =>
  <Cancel style={{ fontSize: props.size || 24, color: props.color, ...props.style }} />;