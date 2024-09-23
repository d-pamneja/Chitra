import {Box,Typography} from '@mui/material';
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';  
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';  
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';               
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';   
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';  
import Stack from '@mui/material/Stack';

const items = [
    {
        icon: <MovieFilterRoundedIcon sx={{ color: '#fff' }} />,
        title: 'AI-Powered Movie Recommendations',
        description:
        'Get personalized movie suggestions using our AI that adapts to your taste in real time.',
    },
    {
        icon: <QueryStatsRoundedIcon sx={{ color: '#fff' }} />,
        title: 'Deep Movie Analysis',
        description:
        'Analyze movies based on genres, themes, and trends to get insightful recommendations that go beyond just popular picks.',
    },
    {
        icon: <ChatRoundedIcon sx={{ color: '#fff' }} />,
        title: 'Interactive Movie Chatbot',
        description:
        'Engage with our movie chatbot to discuss movie plots, actors, and get personalized recommendations and summaries.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ color: '#fff' }} />,
        title: 'Great User Experience',
        description:
        'Our intuitive and seamless interface ensures you enjoy discovering new movies effortlessly.',
    },
    {
        icon: <PsychologyAltRoundedIcon sx={{ color: '#fff' }} />,
        title: 'Chat Analysis for Movie Tastes',
        description:
        'Send your chats to our AI for analysis, understanding your movie preferences and tastes, and export the insights as a PDF.',
    }
];

export default function Content() {
    return (
      <Stack
        sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
      >
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        </Box>
        {items.map((item, index) => (
          <Stack key={index} direction="row" sx={{ gap: 2 }}>
            {item.icon}
            <div>
              <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {item.description}
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
    );
}