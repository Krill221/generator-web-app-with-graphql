import { AuthProvider } from './authProvider';
import ApolloProvider from './apolloProvider';

import ThemeProvider from './themeProvider';

const Providers = (props) => {
    return <ApolloProvider>
        <ThemeProvider>
            <AuthProvider>
                {props.children}
            </AuthProvider>
        </ThemeProvider>
    </ApolloProvider>
}

export default Providers;