import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { headers } from 'next/headers';
 
const nextConfig: NextConfig = {
     env: {
            NEXT_PUBLIC_CONN_DETAILS_ENDPOINT: '/api/connection-details'
        },


    async headers() {
       return [
        {
            source: '/api/:path*',
            headers: [
                { key: 'Access-Control-Allow-Credentials', value: 'true' },
                { key: 'Access-Control-Allow-Origin', value: '*' },
                { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
            ]
        }
       ]

        
    }
}; 

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig as any);