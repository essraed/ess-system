namespace API.Helpers
{

    public class OTP
    {

        public static string GenerateOtp()
        {
            var rng = new Random();
            return rng.Next(100000, 999999).ToString(); // 6-digit OTP
        }

    }


}