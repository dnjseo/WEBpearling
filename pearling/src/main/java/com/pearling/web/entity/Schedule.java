    package com.pearling.web.entity;

    import java.time.LocalDate;
    import java.time.LocalTime;
    import java.util.Date;

    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    private Integer id;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalDate endDate;
    private LocalTime endTime;
    private Date regDate;
    private String title;
    private Integer memberId;
    private String backgroundColor; 
    private Double latitude;
    private Double longitude;
    private String place;
    private String profileImage;
    private String formattedDate; 
}

            // public Schedule() {
            //     this.regDate = new Date(); // 현재 시간으로 초기화
            // }}
