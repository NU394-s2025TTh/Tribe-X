export interface ITeamMember {
    name: string;
    email: string;
    imageUrl: string;
    team: 'Blue' | 'Red' | 'Green';
}
  
export const teamMembers: ITeamMember[] = [
    { 
        name: 'Zain Jerath',
        email: 'zainjerath2024@u.northwestern.edu',
        imageUrl: 'https://zjerath.github.io/images/Zain.png',
        team: 'Blue',
    },
    {
        name: 'Cael Baumgarten',
        email: 'caelbaumgarten2025@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Blue',
    },
    {
        name: 'Clarissa Shieh',
        email: 'clarissashieh2027@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Blue',
    },
    {
        name: 'Sydney Hoppenworth',
        email: 'sydneyhoppenworth2026@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Blue',
    },
    {
        name: 'Anaise Uwonakunze',
        email: 'anaise.uwonakunze@northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Blue',
    },
    {
        name: 'Jay Yegon',
        email: 'jayyegon2027@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Red',
    },
    {
        name: 'Emma Johnston',
        email: 'emmajohnston2025@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Red',
    },
    {
        name: 'Emma Scally',
        email: 'emmascally2026@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Red',
    },
    {
        name: 'Richard Bann',
        email: 'richardbann2026@u.northwestern.edu',
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        team: 'Red',
    },
    {
        name: 'Lauren Tan',
        email: 'laurentan@u.northwestern.edu',
        imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHjPxIvM_PsXw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698812024617?e=1752105600&v=beta&t=dXxEwgNsle_K6WNjkKZqbd4kSL4fObVDQd_5DqciBZ8',
        team: 'Red',
    }
];