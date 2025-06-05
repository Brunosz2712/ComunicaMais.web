import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

export function Button({ title, variant = 'primary', style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'secondary' ? styles.secondary : styles.primary, style]}
      {...rest}
    >
      <Text style={[styles.text, variant === 'secondary' ? styles.textSecondary : styles.textPrimary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  primary: {
    backgroundColor: '#fff',
  },
  secondary: {
    backgroundColor: '#439CAC',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: '#34465F',
  },
  textSecondary: {
    color: '#fff',
  },
});
