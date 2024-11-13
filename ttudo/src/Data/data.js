// dummyData.js

export const profileData = [
  {
    profile: {
      nickname: "김민지",
      profile_img: "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
      social_type: "NAVER", 
      created_date: "2024-11-12",
      todo_count: 2
    },
    my_todos: [
      {
        id: 1,
        title: "디자인 시안 검토",
        completed: false,
        created_date: "2024-11-12"
      },
      {
        id: 2,
        title: "팀 미팅 준비", 
        completed: true,
        created_date: "2024-11-12"
      },
      {
        id: 3,
        title: "디자인 시안 검토",
        completed: false,
        created_date: "2024-11-12"
      },
      {
        id: 4,
        title: "디자인 시안 검토",
        completed: false,
        created_date: "2024-11-12"
      },
      {
        id: 5,
        title: "디자인 시안 검토",
        completed: false,
        created_date: "2024-11-12"
      },
    ],
    liked_todos: [
      {
        id: 5,
        user_nickname: "이지은",
        title: "프로젝트 기획",
        completed: true,
        created_date: "2024-11-12"
      }
    ],
    bookmarked_users: [
      {
        user_id: 3,
        nickname: "박지훈",
        profile_img: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
      }
    ]
  },
  {
    profile: {
      nickname: "이지은",
      profile_img: "https://ssl.pstatic.net/static/pwe/address/img_profile.png", 
      social_type: "KAKAO",
      created_date: "2024-11-12",
      todo_count: 3
    },
    my_todos: [
      {
        id: 3,
        title: "주간 보고서 작성",
        completed: false,
        created_date: "2024-11-12"
      },
      {
        id: 4,
        title: "이메일 확인",
        completed: true,
        created_date: "2024-11-12"
      },
      {
        id: 5,
        title: "프로젝트 기획",
        completed: true,
        created_date: "2024-11-12"
      }
    ],
    liked_todos: [],
    bookmarked_users: [
      {
        user_id: 4,
        nickname: "김민지",
        profile_img: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
      },
      {
        user_id: 5,
        nickname: "최수진",
        profile_img: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
      }
    ]
  },
  {
    profile: {
      nickname: "박지훈",
      profile_img: "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
      social_type: "GOOGLE",
      created_date: "2024-11-12", 
      todo_count: 1
    },
    my_todos: [
      {
        id: 6,
        title: "코드 리뷰",
        completed: false,
        created_date: "2024-11-12"
      }
    ],
    liked_todos: [
      {
        id: 2,
        user_nickname: "김민지",
        title: "팀 미팅 준비",
        completed: true,
        created_date: "2024-11-12"
      }
    ],
    bookmarked_users: []
  }
];

export default profileData;
