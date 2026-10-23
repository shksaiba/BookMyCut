using BookMyCut.Domain.Enums;

namespace BookMyCut.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public UserRole Role { get; set; } = UserRole.Customer;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Salon
{
    public int Id { get; set; }
    public int OwnerId { get; set; }
    public User? Owner { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public Gender Type { get; set; } = Gender.Unisex;
    public TimeOnly OpensAt { get; set; }
    public TimeOnly ClosesAt { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public List<Stylist> Stylists { get; set; } = new();
    public List<SalonStyle> SalonStyles { get; set; } = new();
}

public class Stylist
{
    public int Id { get; set; }
    public int SalonId { get; set; }
    public Salon? Salon { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Speciality { get; set; }
    public int ExperienceYears { get; set; }
}

public class HairStyle
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Gender Category { get; set; }
    public string Type { get; set; } = "Haircut";
    public string? HairLength { get; set; }
    public string FaceShapes { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public int BaseMinutes { get; set; }
    public string? ImageUrl { get; set; }
    public List<StyleImage> Images { get; set; } = new();
}

public class StyleImage
{
    public int Id { get; set; }
    public int HairStyleId { get; set; }
    public string Url { get; set; } = string.Empty;
}

public class SalonStyle
{
    public int Id { get; set; }
    public int SalonId { get; set; }
    public Salon? Salon { get; set; }
    public int HairStyleId { get; set; }
    public HairStyle? HairStyle { get; set; }
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
}

public class Slot
{
    public int Id { get; set; }
    public int SalonId { get; set; }
    public int StylistId { get; set; }
    public Stylist? Stylist { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsBooked { get; set; }
}

public class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int SalonId { get; set; }
    public Salon? Salon { get; set; }
    public int SalonStyleId { get; set; }
    public SalonStyle? SalonStyle { get; set; }
    public int SlotId { get; set; }
    public Slot? Slot { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public PaymentMode PaymentMode { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal AmountPaidNow { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Payment
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public Booking? Booking { get; set; }
    public string RazorpayOrderId { get; set; } = string.Empty;
    public string? RazorpayPaymentId { get; set; }
    public decimal Amount { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Created;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class SalonReview
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public int UserId { get; set; }
    public int SalonId { get; set; }
    public int Cleanliness { get; set; }
    public int Service { get; set; }
    public int Value { get; set; }
    public int Staff { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class StyleReview
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int HairStyleId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class TryOnSession
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int HairStyleId { get; set; }
    public string? FaceShape { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Favorite
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? SalonId { get; set; }
    public int? HairStyleId { get; set; }
}

public class Offer
{
    public int Id { get; set; }
    public int SalonId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int DiscountPercent { get; set; }
    public DateTime ValidTill { get; set; }
}