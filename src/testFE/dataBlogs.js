let num = 20;
const randomImg = () => {
  num++;
  return "https://picsum.photos/" + num.toString();
};
export default dataBlogs = [
  {
    ID: 1,
    img: randomImg(),
    fulName: "TeacherAnna",
    header: "Phương pháp học tiếng Anh hiệu quả cho trẻ em",
    content:
      "Mọi người có thể chia sẻ kinh nghiệm và phương pháp học tiếng Anh cho trẻ em không? Mình đang tìm cách giúp con mình học tốt hơn.",
    comments: [
      {
        userName: "ParentJohn",
        img: randomImg(),
        content:
          "Mình thấy bạn nên sử dụng các ứng dụng học tiếng Anh như Duolingo hoặc ABCmouse. Chúng rất hữu ích và thú vị cho trẻ em.",
        dateComment: "2024-11-27",
        replies: [
          {
            userName: "TeacherAnna",
            img: randomImg(),
            content: "Cảm ơn bạn, mình sẽ thử ngay! Hy vọng con mình sẽ thích.",
            dateComment: "2024-11-27",
          },
        ],
      },
      {
        userName: "MommyJane",
        img: randomImg(),
        content:
          "Bạn nên kết hợp học tiếng Anh qua các bài hát và trò chơi. Trẻ em sẽ học nhanh hơn khi cảm thấy vui vẻ.",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "TeacherAnna",
            img: randomImg(),
            content:
              "Mình đã thử, nhưng vẫn khó khăn khi con không tập trung. Mình sẽ thử thêm các trò chơi mới!",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "DadMike",
        img: randomImg(),
        content:
          "Mình cũng đang tìm cách giúp con học tiếng Anh. Mọi người có mẹo gì để cải thiện không?",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "ParentJohn",
            img: randomImg(),
            content:
              "Ngoài các ứng dụng, bạn nên đọc sách tiếng Anh cùng con và khuyến khích con nói tiếng Anh hàng ngày.",
            dateComment: "2024-11-28",
          },
          {
            userName: "TeacherAnna",
            img: randomImg(),
            content:
              "Cảm ơn bạn, mình sẽ thử đọc sách cùng con trong các buổi tối!",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 10,
  },
  {
    ID: 2,
    img: randomImg(),
    fulName: "BookLover",
    header: "Đánh giá sách tiếng Anh cho trẻ em",
    content:
      "Mình vừa đọc thử một số sách tiếng Anh cho trẻ em. Nội dung thú vị, hình ảnh đẹp nhưng một số từ vựng hơi khó. Có ai đã đọc chưa? Chia sẻ cảm nhận nhé!",
    comments: [
      {
        userName: "ReadingMom",
        img: randomImg(),
        content:
          "Sách này khá ổn nhưng đúng là có một số từ vựng khó. Mình hi vọng sẽ có phiên bản dễ hiểu hơn.",
        dateComment: "2024-11-28",
        replies: [],
      },
      {
        userName: "TeacherTom",
        img: randomImg(),
        content:
          "Nội dung thật sự hấp dẫn, nhưng từ vựng khó làm giảm trải nghiệm. Mình cũng mong chờ phiên bản dễ hơn.",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "BookLover",
            img: randomImg(),
            content: "Mình cũng vậy, hi vọng sớm có phiên bản mới!",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "KidReader",
        img: randomImg(),
        content:
          "Hình ảnh sách rất đẹp, nhưng từ vựng lại chưa thật sự dễ hiểu. Có ai cảm thấy vậy không?",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "BookLover",
            img: randomImg(),
            content:
              "Đúng vậy, mặc dù hình ảnh rất đẹp nhưng từ vựng còn khó và dễ gây khó khăn cho trẻ.",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 302,
  },
  {
    ID: 3,
    img: randomImg(),
    fulName: "ClassicTeacher",
    header: "Tìm kiếm tài liệu học tiếng Anh cổ điển",
    content:
      "Mình là fan của các tài liệu học tiếng Anh cổ điển như sách Oxford, Cambridge. Mọi người có thể gợi ý thêm những tài liệu hay và đáng học không? Cảm ơn nhiều!",
    comments: [
      {
        userName: "EnglishFan",
        img: randomImg(),
        content:
          "Nếu bạn thích sách Oxford thì thử sách Cambridge hoặc Longman nhé, chúng cũng rất hữu ích và chất lượng.",
        dateComment: "2024-11-27",
        replies: [],
      },
      {
        userName: "BookWorm",
        img: randomImg(),
        content:
          "Tôi thấy sách Cambridge là tài liệu hay nhất trong thể loại cổ điển. Bạn có thể thử thử sức với nó!",
        dateComment: "2024-11-27",
        replies: [
          {
            userName: "ClassicTeacher",
            img: randomImg(),
            content:
              "Mình đã thử sách Cambridge rồi, nhưng rất muốn tìm thêm nhiều tài liệu khác nữa. Ai có thêm gợi ý không?",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "StudyMaster",
        img: randomImg(),
        content:
          "Sách Longman và Collins cũng là những tài liệu cổ điển không thể bỏ qua. Cùng một chút thử thách và kiến thức!",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 3,
  },
  {
    ID: 4,
    img: randomImg(),
    fulName: "SpeedLearner",
    header: "Kỷ lục học tiếng Anh mới",
    content:
      "Vừa hoàn thành khóa học tiếng Anh trong 3 tháng với điểm số xuất sắc. Ai cũng thích học tiếng Anh thì giao lưu nào!",
    comments: [
      {
        userName: "FastLearnerX",
        img: randomImg(),
        content:
          "Wow, hoàn thành khóa học trong 3 tháng là một kỷ lục tuyệt vời! Chia sẻ cách bạn học đi!",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "SpeedLearner",
            img: randomImg(),
            content:
              "Mình học mỗi ngày 1-2 giờ và chủ yếu tập trung vào từ vựng và ngữ pháp. Hãy thử đi, bạn sẽ cải thiện nhanh chóng!",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "TimeChaser",
        img: randomImg(),
        content:
          "Chúc mừng bạn đã hoàn thành khóa học! Còn mục tiêu nào bạn đang nhắm tới không?",
        dateComment: "2024-11-28",
        replies: [],
      },
      {
        userName: "LearnerPro",
        img: randomImg(),
        content:
          "Mình đang nhắm mục tiêu đạt điểm cao trong kỳ thi IELTS. Nếu bạn có mẹo gì thì chia sẻ giúp mình nhé!",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "SpeedLearner",
            img: randomImg(),
            content:
              "IELTS có những phần khó nhưng rất thú vị. Hãy luyện tập thật nhiều và kiên nhẫn. Đừng bỏ cuộc!",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 450,
  },
  {
    ID: 5,
    img: randomImg(),
    fulName: "StrategyTeacher",
    header: "Hướng dẫn học tiếng Anh hiệu quả",
    content:
      "Hướng dẫn chi tiết cách học tiếng Anh hiệu quả, từ chọn tài liệu đến phương pháp học. Link bài viết chi tiết trong phần bình luận!",
    comments: [
      {
        userName: "StudentA",
        img: randomImg(),
        content:
          "Cảm ơn bạn! Mình vừa học xong phần ngữ pháp cơ bản, sẽ thử nghiệm ngay.",
        dateComment: "2024-11-28",
        replies: [],
      },
      {
        userName: "StudentB",
        img: randomImg(),
        content:
          "Bài hướng dẫn rất chi tiết. Mình sẽ thử theo phương pháp bạn đưa ra. Hy vọng nó hiệu quả!",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "StrategyTeacher",
            img: randomImg(),
            content:
              "Chúc bạn thành công! Hãy để lại feedback nếu có gì cần cải thiện nhé.",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 245,
  },
  {
    ID: 6,
    img: randomImg(),
    fulName: "VRTeacher",
    header: "Trải nghiệm học tiếng Anh qua VR",
    content:
      "Mình vừa thử qua ứng dụng học tiếng Anh bằng công nghệ VR. Cảm giác như bước vào lớp học thực tế ảo, rất đáng để thử nếu bạn muốn học tiếng Anh một cách mới mẻ.",
    comments: [
      {
        userName: "VRStudent",
        img: randomImg(),
        content:
          "Ứng dụng này mình cũng đã thử, cảm giác thật sự rất tuyệt vời. Tính năng tương tác tốt, nhưng có một số điểm vẫn cần cải thiện.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 120,
  },
  {
    ID: 7,
    img: randomImg(),
    fulName: "IndieTeacher",
    header: "Ứng dụng học tiếng Anh hay tháng này",
    content:
      "Khám phá các ứng dụng học tiếng Anh như Duolingo, Memrise. Cực kỳ sáng tạo và gây nghiện!",
    comments: [
      {
        userName: "AppFanatic",
        img: randomImg(),
        content:
          "Cả hai ứng dụng này mình đều dùng rồi. Duolingo đặc biệt thú vị, nhưng Memrise lại có phương pháp học rất cuốn.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 67,
  },
  {
    ID: 8,
    img: randomImg(),
    fulName: "LootHunter",
    header: "Chia sẻ mẹo học từ vựng",
    content:
      "Có mẹo nào để học từ vựng tiếng Anh nhanh và hiệu quả không? Mình cần một vài phương pháp để nhớ từ vựng lâu hơn.",
    comments: [
      {
        userName: "VocabMaster",
        img: randomImg(),
        content:
          "Thử sử dụng flashcards và học từ vựng theo chủ đề. Bạn sẽ nhớ từ vựng lâu hơn khi học theo cách này.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 32,
  },
  {
    ID: 9,
    img: randomImg(),
    fulName: "CosplayQueen",
    header: "Cosplay nhân vật học tiếng Anh",
    content:
      "Mình vừa hoàn thiện bộ cosplay nhân vật giáo viên tiếng Anh. Mọi người thấy sao? Ai yêu thích cosplay thì chia sẻ bộ của bạn nhé!",
    comments: [
      {
        userName: "CosplayMaster",
        img: randomImg(),
        content:
          "Wow, bộ cosplay của bạn đẹp quá! Bạn làm như thế nào để tạo được độ chi tiết vậy?",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 210,
  },
  {
    ID: 10,
    img: randomImg(),
    fulName: "PuzzleMaster",
    header: "Game giải đố học tiếng Anh",
    content:
      "Game giải đố gần đây mình thích nhất là 'Wordscapes'. Bạn nào có các game giải đố tương tự thì giới thiệu mình với!",
    comments: [
      {
        userName: "MindBender",
        img: randomImg(),
        content:
          "Nếu bạn thích 'Wordscapes' thì thử chơi 'Scrabble', nó cũng khá giống về kiểu giải đố.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 90,
  },
];
