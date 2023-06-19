// package com.pearling.web.api.controller;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.ModelAttribute;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.pearling.web.entity.Member;
// import com.pearling.web.security.MyUserDetails;
// import com.pearling.web.service.MemberService;

// @RestController("apiMemberController")
// @RequestMapping("api/profile")
// public class MemberController {

//     @Autowired
//     private MemberService service;

//     @GetMapping("{id}")
//     public List<Member> profileForm() {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

//         int userId = userDetails.getId();
        
//         List<Member> profileList = new ArrayList<>();
//         profileList = service.getListByUserId(userId);

//         return profileList;
//     }

//     //@PostMapping("/profile")
//     public String profileSubmit(@ModelAttribute Member member,
//                 @AuthenticationPrincipal MyUserDetails user, Model model) {

//         Member existingMember = service.getByUsername(user.getUsername());

//         if (existingMember != null) {
//             existingMember.setName(member.getName());
//             existingMember.setNickname(member.getNickname());
//             service.updateMember(existingMember);

//             // 수정된 pmember 객체를 다시 모델에 추가합니다.
//             model.addAttribute("pmember", existingMember);
//         } else {
//             throw new RuntimeException("Member not found with username: " + user.getUsername());
//         }

//         return "redirect:/profile";
//     }
    
// }
