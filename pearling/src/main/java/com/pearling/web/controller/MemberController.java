package com.pearling.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;


@Controller
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("/signup")
    public String signupForm(Model model){
        model.addAttribute("member", new Member());
        return "signup";
    }

    @PostMapping("signup")
    public String signupSubmit(@ModelAttribute Member member){
        service.registerMember(member);
        return "redirect:/login";
    }

    @GetMapping("/profile")
    public String profileForm(Model model,
        @AuthenticationPrincipal MyUserDetails user) {
        Member pmember = service.getByUsername(user.getUsername());
        model.addAttribute("pmember", pmember);
        System.out.println("ggggggggg 반갑습니다----------------------");
        return "setting/profile";
    }

    @PostMapping("/profile")
    public String profileSubmit(@ModelAttribute Member member,
                                @AuthenticationPrincipal MyUserDetails user,
                                @RequestParam("file") MultipartFile file,
                                HttpServletRequest request,
                                Model model) throws IOException {
        Member existingMember = service.getByUsername(user.getUsername());

        if (existingMember != null) {
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());

            if (!file.isEmpty()) {
                // 파일 업로드를 MemberService를 통해 처리
                String fileName = service.uploadProfileImage(file, request);
                existingMember.setProfileImage(fileName);
                System.out.println("나 업로드 중이다아앙!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            }

            // 서비스 계층의 업데이트 코드를 제거하였으므로 해당 부분을 수정해야합니다.
            int result = service.updateMember(existingMember);

            if (result != 0) {
                user.setName(member.getName());
                user.setNickname(member.getNickname());
                user.setProfileImage(member.getProfileImage());
                System.out.println("이미지!@@@@@" + member.getProfileImage());
            }

            // 수정된 member 객체를 다시 모델에 추가합니다.
            model.addAttribute("member", existingMember);

            // 다른 작업이나 리디렉션을 처리하기 위해 코드를 수정합니다.

            return "redirect:/setting/profile";
        }

        return "redirect:/setting/profile";
    }

    // @PostMapping("/profile")
    // public String profileSubmit(@ModelAttribute Member member,
    //                             @AuthenticationPrincipal MyUserDetails user,
    //                             @RequestParam("file") MultipartFile file,
    //                             Model model) {
    //     Member existingMember = service.getByUsername(user.getUsername());

    //     if (existingMember != null) {
    //         existingMember.setName(member.getName());
    //         existingMember.setNickname(member.getNickname());

    //         if (!file.isEmpty()) {
    //             // 파일을 데이터베이스에 저장합니다.
    //             String originalFilename = file.getOriginalFilename();
    //             // String fileName = UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(originalFilename);
    //             existingMember.setProfileImage(originalFilename);
    //         }

    //         // 서비스 계층의 업데이트 코드를 제거하였으므로 해당 부분을 수정해야합니다.
    //         int result = service.updateMember(existingMember);

    //         if (result != 0) {
    //             user.setName(member.getName());
    //             user.setNickname(member.getNickname());
    //             user.setProfileImage(member.getProfileImage());
    //         }

    //         // 수정된 member 객체를 다시 모델에 추가합니다.
    //         model.addAttribute("member", existingMember);

    //         // 다른 작업이나 리디렉션을 처리하기 위해 코드를 수정합니다.

    //         return "redirect:/setting/profile";
    //     }

    //     return "redirect:/setting/profile";
    // }


    // @PostMapping("/uploadProfileImage")
    // public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file,
    //     HttpServletRequest request) throws IOException {
    //     // 파일 업로드 처리
    //     if (!file.isEmpty()) {
    //         String filePath = "resources/img/";
    //         String realPath = request.getServletContext().getRealPath(filePath);

    //         System.out.println(realPath);

    //         File pathFile = new File(realPath);
    //         if (!pathFile.exists())
    //             pathFile.mkdir();

    //         String originalFilename = file.getOriginalFilename();
    //         // String fileName = UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(originalFilename);
    //         // System.out.println("이것은 이름입니다!!!!!!!"+fileName);
    //         String fullPath = realPath + File.separator + originalFilename;

    //         try {
    //             // 파일 저장
    //             file.transferTo(new File(fullPath));
    //             // 파일 저장 성공 시, 업로드된 파일의 경로를 JSON 형태로 응답
    //             return ResponseEntity.ok().body("{\"filePath\": \"/" + filePath + originalFilename + "\"}");
    //         } catch (IOException e) {
    //             // 파일 저장 중 에러 발생 시 예외 처리
    //             e.printStackTrace();
    //             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                     .body("파일 업로드 중에 오류가 발생했습니다.");
    //         }
    //     } else {
    //         return ResponseEntity.badRequest().body("업로드할 파일을 선택해주세요.");
    //     }
    // }

 

}