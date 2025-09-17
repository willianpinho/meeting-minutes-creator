// React Native implementation of Material Icons
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type {
  MaterialIconProps,
  MaterialIconComponent,
  MaterialIconName,
} from '@meeting-minutes/shared/components/MaterialIcons';

// React Native Material Icon implementation
export const MaterialIcon: React.FC<MaterialIconProps & { name: MaterialIconName }> = ({
  name,
  size = 24,
  color = '#000000',
  style,
}) => {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};

// Individual icon components for React Native
export const AddIcon: MaterialIconComponent = (props) =>
  <Icon name="add" size={props.size || 24} color={props.color} style={props.style} />;

export const DescriptionIcon: MaterialIconComponent = (props) =>
  <Icon name="description" size={props.size || 24} color={props.color} style={props.style} />;

export const VisibilityIcon: MaterialIconComponent = (props) =>
  <Icon name="visibility" size={props.size || 24} color={props.color} style={props.style} />;

export const ArrowBackIcon: MaterialIconComponent = (props) =>
  <Icon name="arrow-back" size={props.size || 24} color={props.color} style={props.style} />;

export const EditIcon: MaterialIconComponent = (props) =>
  <Icon name="edit" size={props.size || 24} color={props.color} style={props.style} />;

export const DeleteIcon: MaterialIconComponent = (props) =>
  <Icon name="delete" size={props.size || 24} color={props.color} style={props.style} />;

export const SaveIcon: MaterialIconComponent = (props) =>
  <Icon name="save" size={props.size || 24} color={props.color} style={props.style} />;

export const CancelIcon: MaterialIconComponent = (props) =>
  <Icon name="cancel" size={props.size || 24} color={props.color} style={props.style} />;