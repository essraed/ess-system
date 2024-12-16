using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "IsBussinesSetup",
                table: "Contacts",
                newName: "LocalAgent");

            migrationBuilder.AddColumn<bool>(
                name: "Ejari",
                table: "Contacts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EnquiryType",
                table: "Contacts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LicenseType",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ejari",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "EnquiryType",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "LicenseType",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "LocalAgent",
                table: "Contacts",
                newName: "IsBussinesSetup");

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
