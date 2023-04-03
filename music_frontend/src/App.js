import './App.css';
import AppRoutes from './pages/AppRoutesPage/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider, 
  ReactQueryDevtools
} from '@tanstack/react-query'
import ProfileApiCalls from './Api/ProfileApiCalls';


const queryClient = new QueryClient()

function App() {

const profileApi = new ProfileApiCalls(); 



  const { data: profile, isLoading, isError } = useQuery(['profile'], async () => {
    try {
      const data = await profileApi.getProfile();
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  });

  const mutation = useMutation(profileApi.updateProfile, {
    onSuccess: (updatedData) => {
      queryClient.setQueryData('profile', updatedData);
    },
  });


  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    
      <BrowserRouter>
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={(value) => setIsLoggedIn(value)}
          profile={profile}
        />
      </BrowserRouter>
  );
}

export default App;
