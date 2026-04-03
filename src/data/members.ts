export type Member = {
  id: number;
  name: string;
  username: string;
  npm: string;
  department: "Computer Science" | "Information Systems";
  origin: string;
  bio: string;
  avatar: string;
  accent: "indigo" | "cyan" | "emerald";
  icons: [string, string];
};

export const members: Member[] = [
  {
    id: 1,
    name: "Malik Alifan Kareem",
    username: "@malik_kareem",
    npm: "2406348710",
    department: "Computer Science",
    origin: "JAKARTA, ID",
    bio: "Full-stack engineer focusing on distributed systems and high-availability architecture.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1gwxl20854IdAHg0cc1vsbXaY6GbWK1N3_KmiurmSFo8oGCODiJvQYfLGpgBimDFJVm42BpArIZiTDQkDBlcqSWwpnls8QoD_ZXu4Hx6_OgBlQQcmq9TrZKSWQSZs_r1Mz-k8r0hPLq5QI2NXFEJd1eJfhZ6pwj9ljl_1k45o_2gA3hSws6zf7CDBo-u8z5-s2qtGe8qcGUSzHIm4kuZ_hCTmp-WdTfE3P4Q8RJR7-B1IGuG6VYMsCYGx_6QycGGUnhk7THxNPEo",
    accent: "indigo",
    icons: ["code", "alternate_email"],
  },
  {
    id: 2,
    name: "Haekal Handrian",
    username: "@haekal_hndrn",
    npm: "2406431536",
    department: "Computer Science",
    origin: "BANDUNG, ID",
    bio: "Specializing in system security and OAuth protocol implementation across enterprise platforms.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgwMmd_n_DkT1p6cYHPV-CrpscrallqcyHEom3fdAigtcPmiv-ef18H20HKSRHQ5WL6bK99S0LXw_WdMJYEErAolMmfFj2H8K77dbXhswiv0t3iLiXYFU_IENU23cPshXdtGPQEEC3miWSC3V2ETgD6_oDlLKapPnJfrMrp9sMbpEEWLzxA24iFXbi_x0jD_nsLn6OiMBy2mO37CoqPmgGY74D6apkcgcTdh_QNhhHwEhcBXCIlRF5q6ZYOL6LHAo3Dpo2-RAC4E",
    accent: "cyan",
    icons: ["terminal", "share"],
  },
  {
    id: 3,
    name: "Erik Wilbert",
    username: "@erik_wilbert",
    npm: "2406495376",
    department: "Information Systems",
    origin: "SURABAYA, ID",
    bio: "Interface designer and frontend developer focused on terminal aesthetics and precision UI.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDimsrB9tjbkUKuX84ke8BWeow1J8tQBI91h8NVZCJ6DX65YJYH3JQfOe7jSUXfO6PKcQJTjyoOkBeITmXS71u0wY8reXp7Ta6qhQZjzl_TS84Su0vVQf_c32Znk02YIjfQx7A8TrERZQN9EO4QQmaJOopU-dLFNRwx1pjLQpWQwR_qq1gMuiud72bENF2vtIVWP72ilv9HE_W5xkX4MvEg_d9qHD7MgEaeDadlB1MeTrUzucHU2AF9615qKkT5PWgRJ2m9ycSISr4",
    accent: "emerald",
    icons: ["palette", "link"],
  },
  {
    id: 4,
    name: "Helven Marcia",
    username: "@helven_m",
    npm: "2406359853",
    department: "Computer Science",
    origin: "MEDAN, ID",
    bio: "Backend engineer optimizing low-latency data pipelines and authentication flows.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYiNbtRExXgQJuw6gz1j8rEiGW78Kj9TYQFn6ravBP7bER17qbiEvHaHawpopq-jjXRifwNpm0zBlvoGb8qLHpnbhgXk9crkkmgjZWElp57L_ZnQS-G3U_XfENpwmhYlgYxbJrt9ratyv9Uz0zxpxNT2YU39VQs0EXPdiRgThV8nRJCVkmJbR4zYMrsCAvCDO9NXVc1DpiyVH10ZqGkLNQJ605wkKbwZH44anfV-I8BN1MkaF8LgiMvDW-Z6P7llYqH7isRo32fAU",
    accent: "indigo",
    icons: ["database", "public"],
  },
  {
    id: 5,
    name: "Dylan Pirade",
    username: "@dylan_ponglabba",
    npm: "2406496126",
    department: "Information Systems",
    origin: "MAKASSAR, ID",
    bio: "Systems analyst and technical writer focused on large-scale infrastructure deployment.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCx3t4EOCxHukYPrX2qX9X15wPcxw1pLiaeYRzvqXkKPWeK9yDMl9Sg9O8QCmjItmYVZOJxkikLvCHFD270hoWKi-lXcLZbPgbVv5ycnIc7TVS9RiWtsKC_c7uYI8hAhEfzle7yHh5kkony-CNR9XW3bwwpd09rfBbTkj5Z7lrSgyCnTP4ctDM5124jEzpO0EqUgchN6gy63lCXiXm6oBEJeskkcUeNPydCcft2QPZnRKmaN8vRxMmz62NLHddUnj2V6WeOdIs75kY",
    accent: "emerald",
    icons: ["description", "cloud"],
  },
];
