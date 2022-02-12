import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Image from 'next/image';
import { Container } from '@mui/material';
import Link from '../src/Link';

export default function Copyright() {
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://linwood.dev">
          Linwood
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
      <Link noLinkStyle href="https://vercel.com?utm_source=Linwood&utm_campaign=oss">
        <Image src="/powered-by-vercel.svg" width={212} height={44} />
      </Link>
    </Container>
  );
}
