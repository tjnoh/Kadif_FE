import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>ciot (주)시옷 File-Weasel Dashboard</title>
      </head>
      <body id={'root'}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
