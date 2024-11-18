namespace API.Helpers
{
    public static class UploadingImages
    {
        public static string GetImagePath(string? pictureFileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", pictureFileName);

            if (System.IO.File.Exists(filePath))
            {
                return "images/" + pictureFileName; // Path relative to your frontend requests
            }

            return null; // Or some default image path if file doesn't exist
        }
        public  static string StoreFile(IFormFile? pictureFile)
        {
            var pictureUrl = "";
            if (pictureFile != null)
            {
                var fiveMegaByte = 5 * 1024 * 1024;
                var validImageTypes = new[] { "image/png", "image/jpeg" };

                if (pictureFile?.Length > fiveMegaByte || !validImageTypes.Contains(pictureFile?.ContentType))
                {
                    throw new Exception("File is not valid. Only PNG and JPEG files under 5MB are allowed.");
                }

                // Get the file extension and generate a unique file name
                var extension = Path.GetExtension(pictureFile.FileName);  // e.g., ".png" or ".jpeg"
                pictureUrl = Guid.NewGuid().ToString() + extension;  // Generate a unique file name with extension

                // Define the path to save the file
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", pictureUrl); // Save in "Images" folder


                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                     pictureFile.CopyToAsync(stream);
                }
            }

            return pictureUrl;

        }
    }
}
