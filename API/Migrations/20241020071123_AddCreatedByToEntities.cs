using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedByToEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Mails",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Mails",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Documents",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Documents",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Authorities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Authorities",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "Authorities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Authorities",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mails_CreatedById",
                table: "Mails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Mails_UpdatedById",
                table: "Mails",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_CreatedById",
                table: "Documents",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_UpdatedById",
                table: "Documents",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Authorities_CreatedById",
                table: "Authorities",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Authorities_UpdatedById",
                table: "Authorities",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Authorities_AspNetUsers_CreatedById",
                table: "Authorities",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Authorities_AspNetUsers_UpdatedById",
                table: "Authorities",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById",
                table: "Documents",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_AspNetUsers_UpdatedById",
                table: "Documents",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mails_AspNetUsers_CreatedById",
                table: "Mails",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mails_AspNetUsers_UpdatedById",
                table: "Mails",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Authorities_AspNetUsers_CreatedById",
                table: "Authorities");

            migrationBuilder.DropForeignKey(
                name: "FK_Authorities_AspNetUsers_UpdatedById",
                table: "Authorities");

            migrationBuilder.DropForeignKey(
                name: "FK_Documents_AspNetUsers_CreatedById",
                table: "Documents");

            migrationBuilder.DropForeignKey(
                name: "FK_Documents_AspNetUsers_UpdatedById",
                table: "Documents");

            migrationBuilder.DropForeignKey(
                name: "FK_Mails_AspNetUsers_CreatedById",
                table: "Mails");

            migrationBuilder.DropForeignKey(
                name: "FK_Mails_AspNetUsers_UpdatedById",
                table: "Mails");

            migrationBuilder.DropIndex(
                name: "IX_Mails_CreatedById",
                table: "Mails");

            migrationBuilder.DropIndex(
                name: "IX_Mails_UpdatedById",
                table: "Mails");

            migrationBuilder.DropIndex(
                name: "IX_Documents_CreatedById",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_UpdatedById",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Authorities_CreatedById",
                table: "Authorities");

            migrationBuilder.DropIndex(
                name: "IX_Authorities_UpdatedById",
                table: "Authorities");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Authorities");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Authorities");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "Authorities");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Authorities");
        }
    }
}
