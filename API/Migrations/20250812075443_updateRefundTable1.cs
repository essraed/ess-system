using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class updateRefundTable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Testimonials",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Contacts",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsUber",
                table: "Categories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Blogs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Testimonials_UpdatedById",
                table: "Testimonials",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_UpdatedById",
                table: "Contacts",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_UpdatedById",
                table: "Blogs",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_AspNetUsers_UpdatedById",
                table: "Blogs",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_AspNetUsers_UpdatedById",
                table: "Contacts",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Testimonials_AspNetUsers_UpdatedById",
                table: "Testimonials",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_AspNetUsers_UpdatedById",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_AspNetUsers_UpdatedById",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Testimonials_AspNetUsers_UpdatedById",
                table: "Testimonials");

            migrationBuilder.DropIndex(
                name: "IX_Testimonials_UpdatedById",
                table: "Testimonials");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_UpdatedById",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_UpdatedById",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Testimonials");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "IsUber",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Blogs");
        }
    }
}
