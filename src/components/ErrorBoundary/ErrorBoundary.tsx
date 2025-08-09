import { Component, ErrorInfo, ReactNode } from 'react';

import { BugReport, Home, Refresh } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';

import './_ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  translations?: {
    title: string;
    description: string;
    tryAgain: string;
    goHome: string;
  };
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console and any error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: 2,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              maxWidth: 500,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <BugReport
              sx={{
                fontSize: 64,
                color: 'error.main',
                marginBottom: 2,
              }}
            />

            <Typography variant="h4" component="h1" gutterBottom>
              Oops! Something went wrong
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              We encountered an unexpected error. Don't worry, our team has been
              notified.
            </Typography>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                sx={{
                  backgroundColor: '#f8f8f8',
                  padding: 2,
                  borderRadius: 1,
                  marginY: 2,
                  textAlign: 'left',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <Typography variant="body2" color="error">
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                marginTop: 3,
              }}
            >
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleRetry}
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
              >
                Go Home
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
