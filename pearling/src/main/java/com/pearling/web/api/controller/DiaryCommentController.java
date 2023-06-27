package com.pearling.web.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.DiaryComment;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryCommentService;

@RestController("apiDiaryCommentController")
@RequestMapping("api/diaryComments")
public class DiaryCommentController {

	@Autowired
	private DiaryCommentService service;

	// @PostMapping
	// public int add(DiaryLike DiaryLike) {
	// return service.append(DiaryLike);
	// }

	@GetMapping("{diaryId}")
	public List<DiaryComment> list(
		@PathVariable("diaryId") Integer diaryId,
		@AuthenticationPrincipal MyUserDetails user) {

			Integer memberId = null;
	
			if (user != null) {
				memberId = user.getId();
			}
		List<DiaryComment> diaryComment = service.getList(memberId, diaryId);

		System.out.println("나는 다이어리 코멘트 겟요청 레스트컨트롤러지롱");

		return diaryComment;
	}

	@GetMapping("count")
	public int count(@RequestParam("dr") int diaryId) {

		int result = service.getCountByDiary(diaryId);

		return result;
	}

	@PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public int add(
			@ModelAttribute DiaryComment diaryComment,
			@AuthenticationPrincipal MyUserDetails user) {
	
		Integer memberId = null;
		String regMemberNickname = null;
	
		if (user != null) {
			memberId = user.getId();
			regMemberNickname = user.getNickname();
		}
	
		diaryComment = DiaryComment.builder()
				.regMemberId(memberId)
				.content(diaryComment.getContent())
				.diaryPostId(diaryComment.getDiaryPostId())
				.regMemberNickname(regMemberNickname)
				.build();
	
		System.out.println("나는 다이어리 포스트요청 레스트컨트롤러지롱");

	
		return service.append(diaryComment);
	}

	@DeleteMapping("{diaryId}/members/{memberId}")
	public int delete(@PathVariable("diaryId") int diaryId,
			@PathVariable("memberId") int memberId,
			DiaryComment diaryComment) {

				diaryComment = DiaryComment.builder()
				.regMemberId(memberId)
				.content(diaryComment.getContent())
				.diaryPostId(diaryId)
				.regMemberNickname(diaryComment.getRegMemberNickname())
				.build();

		return service.delete(diaryComment);
	}

}