
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // VisionWardrobe custom colors
                ivory: '#FFFFF0',
                stone: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                },
                terracotta: {
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FECDBD',
                    400: '#FCA692',
                    500: '#F87761',
                    600: '#E54D2E',
                    700: '#BF3913',
                    800: '#9A280C',
                    900: '#7E1E08',
                },
                teal: {
                    50: '#F0FDFA',
                    100: '#CCFBF1',
                    200: '#99F6E4',
                    300: '#5EEAD4',
                    400: '#2DD4BF',
                    500: '#14B8A6',
                    600: '#0D9488',
                    700: '#0F766E',
                    800: '#115E59',
                    900: '#134E4A',
                }
			},
            fontFamily: {
                sans: ['SF Pro Display', 'Helvetica Neue', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['ui-serif', 'Georgia', 'serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
            },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'fade-in': {
                    from: {
                        opacity: '0'
                    },
                    to: {
                        opacity: '1'
                    }
                },
                'fade-out': {
                    from: {
                        opacity: '1'
                    },
                    to: {
                        opacity: '0'
                    }
                },
                'slide-up': {
                    from: {
                        transform: 'translateY(20px)',
                        opacity: '0'
                    },
                    to: {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                'slide-down': {
                    from: {
                        transform: 'translateY(-20px)',
                        opacity: '0'
                    },
                    to: {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                'scale-in': {
                    from: {
                        transform: 'scale(0.95)',
                        opacity: '0'
                    },
                    to: {
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                },
                'bounce-in': {
                    '0%': { 
                        transform: 'scale(0.8)',
                        opacity: '0'
                    },
                    '60%': { 
                        transform: 'scale(1.05)',
                        opacity: '0.8'
                    },
                    '100%': { 
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                },
                'float': {
                    '0%, 100%': { 
                        transform: 'translateY(0)' 
                    },
                    '50%': { 
                        transform: 'translateY(-10px)' 
                    }
                },
                'pulse-subtle': {
                    '0%, 100%': { 
                        transform: 'scale(1)' 
                    },
                    '50%': { 
                        transform: 'scale(1.03)' 
                    }
                },
                'spin-slow': {
                    '0%': { 
                        transform: 'rotate(0deg)' 
                    },
                    '100%': { 
                        transform: 'rotate(360deg)' 
                    }
                },
                'shimmer': {
                    '0%': { 
                        backgroundPosition: '-500px 0' 
                    },
                    '100%': { 
                        backgroundPosition: '500px 0' 
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'fade-out': 'fade-out 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.6s ease-out forwards',
                'slide-down': 'slide-down 0.6s ease-out forwards',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'bounce-in': 'bounce-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 3s ease-in-out infinite',
                'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
                'spin-slow': 'spin-slow 8s linear infinite',
                'shimmer': 'shimmer 2s infinite linear'
			},
            transitionDuration: {
                '2000': '2000ms',
                '3000': '3000ms'
            },
            transitionTimingFunction: {
                'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-subtle': 'linear-gradient(to right, var(--tw-gradient-stops))',
                'shimmer': 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
