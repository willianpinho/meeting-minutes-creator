import React from 'react';

// Common icon props
export interface MaterialIconProps {
  size?: number;
  color?: string;
  style?: any;
}

// Platform-agnostic icon component interface
export interface MaterialIconComponent extends React.FC<MaterialIconProps> {}

// Icon names enum for type safety
export enum MaterialIconName {
  ADD = 'add',
  DESCRIPTION = 'description',
  VISIBILITY = 'visibility',
  ARROW_BACK = 'arrow_back',
  EDIT = 'edit',
  DELETE = 'delete',
  SAVE = 'save',
  CANCEL = 'cancel',
  DOWNLOAD = 'download',
  SHARE = 'share',
  SEARCH = 'search',
  MENU = 'menu',
  MORE_VERT = 'more_vert',
  CHECK = 'check',
  CLOSE = 'close',
}

// Base icon component - to be overridden by platform-specific implementations
export const MaterialIcon: React.FC<MaterialIconProps & { name: MaterialIconName }> = ({
  name,
  size = 24,
  color = '#000000'
}) => {
  return <div style={{ fontSize: size, color }}>{name}</div>; // Fallback
};

// Individual icon components for easier usage
export const AddIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.ADD} />;

export const DescriptionIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.DESCRIPTION} />;

export const VisibilityIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.VISIBILITY} />;

export const ArrowBackIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.ARROW_BACK} />;

export const EditIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.EDIT} />;

export const DeleteIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.DELETE} />;

export const SaveIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.SAVE} />;

export const CancelIcon: MaterialIconComponent = (props) =>
  <MaterialIcon {...props} name={MaterialIconName.CANCEL} />;